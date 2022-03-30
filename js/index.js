
class Produto {
  constructor() {
    this.id = 1;
    this.arrayProdutos = []
  }
  salvar() {
    let produto = this.lerDados();

    if (this.validaCampos(produto)) {
      this.adicionar(produto)
    }
    console.log(this.arrayProdutos)
  }

  adicionar(produto) {
    this.arrayProdutos.push(produto);
    this.id++;
  }

  lerDados() {
    let produto = {}

    produto.id = this.id;
    produto.nomeProduto = document.getElementById('produto').value;
    produto.valor = document.getElementById('valor').value;

    return produto
  }

  validaCampos(produto) {
    let errorAlert = '';
    if (produto.nomeProduto == '') {
      errorAlert += '- Informe o nome do produto \n';
    }

    if (produto.valor == '') {
      errorAlert += '- Informe o valor do produto';
    }

    if (errorAlert != '') {
      alert(errorAlert);
      return false
    }

    return true;
  }

  cancelar() {
  }
}

var produto = new Produto();