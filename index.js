const express = require('express');
const { getStatsByGamemode } = require('osrs-json-hiscores');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/stats/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const { skill } = req.query;
    const stats = await getStatsByGamemode(username);

    if (skill) {
      const skillKey = skill.toLowerCase();
      const skillExp = stats.skills[skillKey]?.xp;
      if (skillExp !== undefined) {
        res.json({ username, skill: skillKey, experience: skillExp });
      } else {
        res.status(400).json({ error: 'Invalid skill name' });
      }
    } else {
      res.json(stats);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});