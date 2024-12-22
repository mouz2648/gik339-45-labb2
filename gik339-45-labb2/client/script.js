async function fetchAndDisplayUsers() { //redovisning musse
  try {
    // hämtar data från servern
    const response = await fetch('http://localhost:3000/users');
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }

    const users = await response.json(); //redovisning musse

    console.log(users);

    const colors = [...new Set(users.map(user => user.color))];

    // här skapar vi en container för våra columnerr 
    const container = document.createElement('div');
    container.classList.add('user-container');

    // skapar en column för varje färg
    colors.forEach(color => {
      const column = document.createElement('div');
      column.classList.add('user-column', color);

      // lägger till en head för fräg
      const header = document.createElement('h2');
      header.textContent = color.charAt(0).toUpperCase() + color.slice(1);
      header.classList.add('color-header');
      column.appendChild(header);

      // lägger till användararna av färg
      users
        .filter(user => user.color === color)
        .forEach(user => {
          const li = document.createElement('li');
          li.classList.add('user-card', user.color);
          li.innerHTML = `
            <div class="user-info">
              <h3>${user.firstName} ${user.lastName}</h3>
              <p><strong>Username:</strong> ${user.username}</p>
              <p><strong>Favorite Color:</strong> ${user.color}</p>
            </div>
          `;
          column.appendChild(li);
        });

      // appendar column
      container.appendChild(column);
    });

    // lägger till container till DOM
    document.body.appendChild(container);

  } catch (error) {
    // hanterar felmedelande
    console.error('Error fetching or displaying users:', error);
  }
}

fetchAndDisplayUsers();
