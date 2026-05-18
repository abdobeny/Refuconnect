<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>RefuConnect</title>
    <link rel="icon" href="{{ asset('images/favicon.svg') }}" type="image/svg+xml">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
    <style>
        body {
            margin: 0;
            min-height: 100vh;
            font-family: Inter, system-ui, sans-serif;
            background: #F3EEE7;
            color: #343B39;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
        }
        .card {
            width: 100%;
            max-width: 28rem;
            background: #FFFDF9;
            border: 1px solid #E8DED2;
            border-radius: 1.25rem;
            padding: 2.5rem 2rem;
            text-align: center;
            box-shadow: 0 8px 24px rgba(32, 42, 37, 0.08);
        }
        .brand {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1.5rem;
        }
        .brand-name {
            font-family: 'Playfair Display', serif;
            font-size: 1.75rem;
            font-weight: 700;
            line-height: 1.1;
        }
        .brand-name span { color: #A9795F; }
        h1 {
            font-family: 'Playfair Display', serif;
            font-size: 1.25rem;
            font-weight: 600;
            margin: 0 0 0.5rem;
            color: #1F2523;
        }
        p {
            margin: 0 0 1.75rem;
            font-size: 0.95rem;
            line-height: 1.6;
            color: #6E706C;
        }
        .actions {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }
        a {
            display: block;
            padding: 0.75rem 1rem;
            border-radius: 0.75rem;
            font-size: 0.9rem;
            font-weight: 600;
            text-decoration: none;
            transition: opacity 0.2s;
        }
        a:hover { opacity: 0.9; }
        .primary {
            background: #2F3634;
            color: #FFFDF9;
        }
        .secondary {
            background: transparent;
            color: #2F3634;
            border: 1px solid #E8DED2;
        }
    </style>
</head>
<body>
    <main class="card">
        <div class="brand">
            <img src="{{ asset('images/favicon.svg') }}" width="56" height="56" alt="RefuConnect">
            <div class="brand-name">Refu<span>Connect</span></div>
        </div>
        <h1>Refuge animalier</h1>
        <p>Plateforme de gestion du refuge. Accédez à l’administration ou au site public.</p>
        <div class="actions">
            <a class="primary" href="{{ url('/admin') }}">Administration</a>
            <a class="secondary" href="{{ env('FRONTEND_URL', 'http://localhost:5173') }}">Site public</a>
        </div>
    </main>
</body>
</html>
