const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000; // Изменено!

const WEBHOOK_URL = 'https://discord.com/api/webhooks/1511778105155391638/BUmeXVVzQ-U_StFXQy9L9K7GDwch_rxpQQN66_IpKE4S_zlvuEyJz99yt_cpCRqPcIOp';

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/send', async (req, res) => {
    const { text } = req.body;
    
    if (!text) {
        return res.status(400).json({ error: 'Текст не может быть пустым' });
    }

    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: text })
        });

        if (response.ok) {
            res.json({ success: true, message: 'Сообщение отправлено!' });
        } else {
            res.status(500).json({ error: 'Ошибка отправки на вебхук' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
