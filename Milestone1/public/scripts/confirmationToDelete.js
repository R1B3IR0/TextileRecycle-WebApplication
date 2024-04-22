function confirmDelete(url) {
    if (confirm("Tem a certeza de que deseja remover?")) {
      window.location.href = url;
    } else {
      return false; // Impede o comportamento padrão do link
    }
  }
