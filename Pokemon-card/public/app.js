document.getElementById('go').onclick = async () => {
    const type = document.getElementById('type').value;
    const limit = document.getElementById('limit').value;

    const res = await fetch('/pokemon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, limit: Number(limit) })
    });

    const data = await res.json();

    const results = document.getElementById('results');
    results.innerHTML = ''; 

    data.forEach(pokemon => {
        const card = document.createElement('div');
        card.textContent = `${pokemon.name}`;
        card.className =
            'card bg-white border rounded-md p-3 my-2 shadow-sm flex items-center';
        results.appendChild(card);
    });

    document.getElementById('type').value = '';
    document.getElementById('limit').value = '';
};