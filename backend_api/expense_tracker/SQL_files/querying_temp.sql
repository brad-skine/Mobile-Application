SELECT * FROM transactions
ORDER BY transaction_date;


DELETE FROM transactions 
WHERE  ID IN( 
	SELECT ID 
	FROM transactions
	ORDER BY ID
	LIMIT 5
);