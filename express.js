const express = require('express');
const { getStatsByGamemode } = require('osrs-json-hiscores');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/stats/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const stats = await getStatsByGamemode(username);
    res.json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});