/* LISTAR o WOD cadastrado */
document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3030/wods/all", {
      headers: {
        Authorization: "Bearer YOUR_ACCESS_TOKEN",
      },
    })
      .then((response) => response.json())
      .then((wods) => {
        const wodList = document.getElementById("wodList");
        wods.forEach((wod) => {
          const listItem = document.createElement("li");
          listItem.innerHTML = `<h2>${wod.title}</h2><img src="../assets/Peso.png"><p>${wod.description}</p>`;
          wodList.appendChild(listItem);
        });
      })
      .catch((error) => console.error("Error fetching WODs:", error));
  });

  /* Registrar WOD */
  document.addEventListener("DOMContentLoaded", () => {
    async function loadWods() {
      try {
        const response = await fetch("http://localhost:3030/wods/all", {
          headers: {
            Authorization: "Bearer YOUR_ACCESS_TOKEN",
          },
        });
        const wods = await response.json();
      } catch (error) {
        console.error("Error fetching WODs:", error);
      }
    }

    loadWods();

    document.getElementById("createWodForm").addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = new FormData(event.target);
      const wod = {
        title: formData.get("title"),
        description: formData.get("description"),
      };

      try {
        const existingWodArray = await fetch("http://localhost:3030/wods/all", {
          headers: {
            Authorization: "Bearer YOUR_ACCESS_TOKEN",
          },
        }).then((response) => response.json());

        if (existingWodArray.length === 0) {
          const response = await fetch("http://localhost:3030/wods/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer YOUR_ACCESS_TOKEN",
            },
            body: JSON.stringify(wod),
          });
          const data = await response.json();

          console.log("Resposta da API:", data);

          if (data.message === undefined) {
            document.getElementById("wod").classList.remove("active");
            document.getElementById("register").classList.add("active");
            document.getElementById("wodList").innerHTML = `<li><h2>${data.title}</h2><img src="../assets/Peso.png"><p>${data.description}</p></li>`;

            console.log("WOD criado com sucesso");
          } else {
            console.log("Erro ao criar WOD:", data.error);
          }
        } else {
          document.getElementById("wod").classList.remove("active");
          document.getElementById("register").classList.add("active");
          console.log("Já existe um WOD cadastrado para hoje.");
        }
      } catch (error) {
        console.error("Erro ao criar WOD:", error);
      }
    });
  });

  document.getElementById("button").addEventListener("click", () => {
    document.getElementById("register").classList.remove("active");
    document.getElementById("create").classList.add("active");
  });