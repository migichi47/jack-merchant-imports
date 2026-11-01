export const getExchangeRate = async (req, res) => {
  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/pair/USD/KES`,
    );
    if (!response.ok) {
      throw new Error(`ExchangeRate API returned ${response.status}`);
    }
    const data = await response.json();
    if (data.result !== "success") {
      return res.status(502).json({
        message: "Exchange rate provider returned an error",
        error: data["error-type"],
      });
    }

    res.status(200).json({
      base: data.base_code,
      lastUpdated: data.time_last_update_utc,
      rates: data.conversion_rate,
    });
  } catch (err) {
    console.error("Exchange rate error:", err);
    res.status(500).json({
      message: "Could not get live rates",
    });
  }
};
