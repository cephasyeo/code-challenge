-- select addresses that have made recent trades
WITH recent_trades AS (
  SELECT address
  FROM trades
  WHERE block_height > 730000
  GROUP BY address
),
-- calculate total balance for each address, using conversion rates
address_balances AS (
  SELECT
    balances.address,
    SUM(CASE
      WHEN balances.denom = 'swth' THEN balances.amount * 0.00000005
      WHEN balances.denom = 'usdc' THEN balances.amount * 0.000001
      WHEN balances.denom = 'tmz' THEN balances.amount * 0.003
    END) AS total_balance
  FROM balances
  GROUP BY balances.address
)
SELECT address_balances.address
FROM address_balances
-- only join if both addresses exists in both CTEs
JOIN recent_trades ON address_balances.address = recent_trades.address
WHERE address_balances.total_balance >= 500;