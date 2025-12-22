using Npgsql;
using System.Globalization;

namespace expense_tracker.Services
{
    public class CsvImportService
    {
        private readonly string _connectionString;
        private readonly ILogger<CsvImportService> _logger;
        public CsvImportService(IConfiguration configuration,
            ILogger<CsvImportService> logger)
        {
            _connectionString = configuration.GetConnectionString("localConnection") ?? 
                throw new InvalidOperationException("Connection string 'localConnection' not found.");
            _logger = logger;
        }


        public async Task<Models.ImportResult> ImportTransactionsAsync(Stream csvStream) 
        {
          
            using var reader = new StreamReader(csvStream);
            using var csv = new CsvHelper.CsvReader(reader, CultureInfo.InvariantCulture);

            var records = csv.GetRecords<Models.transactionCsv>().ToList();
            using var connection = new Npgsql.NpgsqlConnection(_connectionString);

            await connection.OpenAsync(); // Open the database connection
            int inserted = 0; // Counter for inserted records
            int skipped = 0; // Counter for skipped records
            foreach (var csvTransaction in records)
            {
                var transaction = new Models.Transaction
                {
                    Date = csvTransaction.Date,
                    TransactionType = csvTransaction.TransactionType,
                    Description = csvTransaction.Description,
                    Amount = Utils.MoneyParser.ParseMoney(csvTransaction.Amount),
                    Balance = Utils.MoneyParser.ParseMoney(csvTransaction.Balance)
                };
                
                using var command = new NpgsqlCommand(
                     """
                    INSERT INTO transactions
                        (transaction_date, transaction_type, description, amount, balance)
                    VALUES
                        (@date, @t_type, @description, @amount, @balance)
                    ON CONFLICT (transaction_date, amount, balance)
                    DO NOTHING;
                    """,
                     connection
                 );
                command.Parameters.AddWithValue("date", transaction.Date.ToDateTime(new TimeOnly(0, 0)));
                command.Parameters.AddWithValue("t_type", transaction.TransactionType);
                command.Parameters.AddWithValue("description", transaction.Description);
                command.Parameters.AddWithValue("amount", transaction.Amount);
                command.Parameters.AddWithValue("balance", transaction.Balance);
        
                int new_row = await command.ExecuteNonQueryAsync();
                if (new_row == 1)
                {
                    inserted++;
                } else
                {
                    skipped++;
                }
                   
            }

            if (inserted == 0)
            {
                _logger.LogWarning("No new records were inserted from the CSV import.");
            } else
            {
                _logger.LogInformation(
                    "CSV import completed. Inserted: {Inserted}, Skipped: {Skipped}",
                    inserted, skipped);
            }
              
            return new Models.ImportResult
            {
                Inserted = inserted,
                Skipped = skipped
            };
        }

    }
}
