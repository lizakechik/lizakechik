export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Служебный endpoint для входа
    if (url.pathname === "/__login" && request.method === "POST") {
      const formData = await request.formData();
      const password = formData.get("password");

      if (password === env.SITE_PASSWORD) {
        return new Response(null, {
          status: 302,
          headers: {
            Location: "/",
            "Set-Cookie": "site_access=granted; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000"
          }
        });
      }

      return new Response(loginPage("Неверный пароль"), {
        status: 401,
        headers: {
          "Content-Type": "text/html; charset=UTF-8"
        }
      });
    }

    // Проверяем, есть ли доступ
    const cookies = request.headers.get("Cookie") || "";

    if (cookies.includes("site_access=granted")) {
      return env.ASSETS.fetch(request);
    }

    return new Response(loginPage(), {
      headers: {
        "Content-Type": "text/html; charset=UTF-8"
      }
    });
  }
};

function loginPage(error = "") {
  return `<!doctype html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Lizа Kechik</title>
  <style>
    body {
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      background: #F7F4EF;
      color: #242424;
      font-family: system-ui, sans-serif;
    }

    main {
      width: min(360px, calc(100% - 40px));
      text-align: center;
    }

    h1 {
      font-size: 24px;
      font-weight: 400;
      margin-bottom: 32px;
    }

    input {
      box-sizing: border-box;
      width: 100%;
      padding: 14px 16px;
      border: 1px solid #ccc;
      background: transparent;
      font: inherit;
      margin-bottom: 12px;
    }

    button {
      width: 100%;
      padding: 14px 16px;
      border: 0;
      background: #242424;
      color: white;
      font: inherit;
      cursor: pointer;
    }

    .error {
      margin-bottom: 16px;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <main>
    <h1>Сайт пока закрыт</h1>
    ${error ? `<div class="error">${error}</div>` : ""}
    <form method="POST" action="/__login">
      <input
        type="password"
        name="password"
        placeholder="Пароль"
        autocomplete="current-password"
        required
      >
      <button type="submit">Войти</button>
    </form>
  </main>
</body>
</html>`;
}