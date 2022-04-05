
class Product {
  constructor() {
    this.id = 1;
    this.arrayProducts = [];
    this.editId = null;
  }

  saveItem() {
    let product = this.readData();

    if (this.fieldValidate(product)) {
      if (this.editId == null) {
        this.addItem(product)
      }else {
        this.updateItem(this.editId, product);
      }

    }
    this.listTable();
    this.cancelItem();
  }

  listTable() {
    let tbody = document.getElementById('tbody')
    tbody.innerText = ''

    for (let i = 0; i < this.arrayProducts.length; i++) {
      let tr = tbody.insertRow();

      let td_id = tr.insertCell();
      let td_product = tr.insertCell();
      let td_price = tr.insertCell();
      let td_actions = tr.insertCell();

      td_id.innerText = this.arrayProducts[i].id;
      td_product.innerText = this.arrayProducts[i].nameProduct;
      td_price.innerText = this.arrayProducts[i].price;

      let imgEdit = document.createElement('img');
      imgEdit.src = 'assets/img/editar.png';
      td_actions.appendChild(imgEdit);
      imgEdit.setAttribute("onClick", "product.preEditItem(" + JSON.stringify(this.arrayProducts[i]) + ")");

      let imgDelete = document.createElement('img');
      imgDelete.src = 'assets/img/deletar-lixeira.png';
      td_actions.appendChild(imgDelete);
      imgDelete.setAttribute("onClick", "product.deleteItem(" + this.arrayProducts[i].id + ")");
    }

  }

  addItem(product) {
    product.price = parseFloat(product.price);
    this.arrayProducts.push(product);
    this.id++;
  }

  updateItem(id, product) {
    console.log(id,product)
    for (let i =0; i < this.arrayProducts.length; i++){
      if (this.arrayProducts[i].id == id) {
        this.arrayProducts[i].nameProduct = product.nameProduct;
        console.log(this.arrayProducts[i])
        this.arrayProducts[i].price = product.price;
      }
    }
  }

  readData() {
    let product = {}

    product.id = this.id;
    product.nameProduct = document.getElementById('product').value;
    product.price = document.getElementById('price').value;

    return product
  }

  fieldValidate(product) {
    let errorAlert = '';
    if (product.nameProduct == '') {
      errorAlert += '- Informe o nome do produto \n';
    }

    if (product.price == '') {
      errorAlert += '- Informe o preço do produto';
    }

    if (errorAlert != '') {
      alert(errorAlert);
      return false
    }

    return true;
  }

  cancelItem() {
    document.getElementById('product').value = '';
    document.getElementById('price').value = '';

    document.getElementById('btnSaveItem').innerText = 'Salvar';
    this.editId = null;
  }

  deleteItem(id) {
    if (confirm('Deseja realmente deletar o produto do ID ' + id + ' ?')) {

      let tbody = document.getElementById('tbody');

      for (let i = 0; i < this.arrayProducts.length; i++) {
        if (this.arrayProducts[i].id == id) {
          this.arrayProducts.splice(i, 1);
          tbody.deleteRow(i);
        }
      }
    }
  }

  preEditItem(JSONdata) {
    this.editId = JSONdata.id;

    document.getElementById('product').value = JSONdata.nameProduct;
    document.getElementById('price').value = JSONdata.price;
    document.getElementById('btnSaveItem').innerText = 'Atualizar';
  }

}

var product = new Product();