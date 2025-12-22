-- This is for when a user imports overlapping date range data and 
-- will ignore duplicate data based of entire row
ALTER TABLE transactions  
ADD CONSTRAINT non_unique_row 
UNIQUE (
    transaction_date,
    amount,
    balance);