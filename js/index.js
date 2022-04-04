
class Produto {
  constructor() {
    this.id = 1;
    this.arrayProdutos = [];
    this.editId = null;
  }

  salvar() {
    let produto = this.lerDados();

    if (this.validaCampos(produto)) {
      if (this.editId == null) {
        this.adicionar(produto)
      }else {
        this.atualizar(this.editId, produto);
      }

    }
    this.listaTabela();
    this.cancelar();
  }

  listaTabela() {
    let tbody = document.getElementById('tbody')
    tbody.innerText = ''

    for (let i = 0; i < this.arrayProdutos.length; i++) {
      let tr = tbody.insertRow();

      let td_id = tr.insertCell();
      let td_produto = tr.insertCell();
      let td_valor = tr.insertCell();
      let td_acoes = tr.insertCell();

      td_id.innerText = this.arrayProdutos[i].id;
      td_produto.innerText = this.arrayProdutos[i].nomeProduto;
      td_valor.innerText = this.arrayProdutos[i].valor;

      let imgEdit = document.createElement('img');
      imgEdit.src = 'assets/img/editar.png';
      td_acoes.appendChild(imgEdit);
      imgEdit.setAttribute("onClick", "produto.prepararEdit(" + JSON.stringify(this.arrayProdutos[i]) + ")");

      let imgDelete = document.createElement('img');
      imgDelete.src = 'assets/img/deletar-lixeira.png';
      td_acoes.appendChild(imgDelete);
      imgDelete.setAttribute("onClick", "produto.deletar(" + this.arrayProdutos[i].id + ")");
    }

  }

  adicionar(produto) {
    produto.valor = parseFloat(produto.valor);
    this.arrayProdutos.push(produto);
    this.id++;
  }

  atualizar(id, produto) {
    console.log(id,produto)
    for (let i =0; i < this.arrayProdutos.length; i++){
      if (this.arrayProdutos[i].id == id) {
        this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
        console.log(this.arrayProdutos[i])
        this.arrayProdutos[i].valor = produto.valor;
      }
    }
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
    document.getElementById('produto').value = '';
    document.getElementById('valor').value = '';

    document.getElementById('btnSalvar').innerText = 'Salvar';
    this.editId = null;
  }

  deletar(id) {
    if (confirm('Deseja realmente deletar o produto do ID ' + id + ' ?')) {

      let tbody = document.getElementById('tbody');

      for (let i = 0; i < this.arrayProdutos.length; i++) {
        if (this.arrayProdutos[i].id == id) {
          this.arrayProdutos.splice(i, 1);
          tbody.deleteRow(i);
        }
      }
    }
  }

  prepararEdit(JSONdata) {
    this.editId = JSONdata.id;

    document.getElementById('produto').value = JSONdata.nomeProduto;
    document.getElementById('valor').value = JSONdata.valor;
    document.getElementById('btnSalvar').innerText = 'Atualizar';
  }

}

var produto = new Produto();