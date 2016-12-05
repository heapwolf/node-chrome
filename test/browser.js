window.onload = () => {
  document.body.innerHTML = '<h1>Hello</h1>'
  const h1 = document.querySelector('h1')

  console.log(h1.textContent)
  window.close()
}
