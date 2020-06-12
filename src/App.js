import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    values: {
      jumlahPinjaman: 0,
      lamaPembayaran: 0,
      bungaPinjaman: 0
    },
    result: {
      jumlahPinjaman: 0,
      lamaPembayaran: 0,
      bungaPinjaman: 0
    },
    table: {
      isHide: true
    },
    type: 'tetap'
  }

  handleFieldChange = field => (e) => {
    const { value } = e.target;
    const newState = { ...this.state };
    newState.values[field] = value;
    this.setState(newState);
  };

  handleCount = () => () => {
    this.setState(prevState => ({
      ...prevState,
      result: {
        jumlahPinjaman: prevState.values.jumlahPinjaman,
        lamaPembayaran: prevState.values.lamaPembayaran,
        bungaPinjaman: prevState.values.bungaPinjaman
      },
      table: {
        isHide: false
      }
    }));
  }

  handleTypeChange = (e) => {
    const { value } = e.target;
    this.setState(prevState => ({
      ...prevState,
      type: value
    }))
  }

  renderColumn = () => {
    const { result, type } = this.state;
    const { lamaPembayaran, bungaPinjaman, jumlahPinjaman } = result;
    const arrayOfRow = [];
    arrayOfRow.push(
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>{result.jumlahPinjaman}</td>
        <td></td>
      </tr>
    );
  
    let jumlahPinjamanSisa = jumlahPinjaman;
    for (let i = 1; i <= result.lamaPembayaran; i += 1) {
      const angsuranPokok = 100 * Math.ceil((Math.floor(jumlahPinjaman / lamaPembayaran) / 100));
      const bungaAngsuran = 100 * Math.ceil((Math.floor(type === 'menurun' ? jumlahPinjamanSisa : jumlahPinjaman * (bungaPinjaman / 100)) / 100));
      const totalAngsuran = Number(angsuranPokok + bungaAngsuran);
      jumlahPinjamanSisa = Number(jumlahPinjamanSisa - angsuranPokok);
      arrayOfRow.push(
        <tr>
          <td>{i}</td>
          <td>
            {totalAngsuran}
          </td>
          <td>
            {bungaAngsuran}
          </td>
          <td>
            {angsuranPokok}
          </td>
          <td>
            {jumlahPinjamanSisa < 0 ? 0 : jumlahPinjamanSisa}
          </td>
        </tr>
      );
    }

    return arrayOfRow;
  }

  render () {
    const { values, table } = this.state;
    const { isHide } = table;
    return (
      <div className="App">
        <div className="field">
          <div style={{ width: '30%' }}>
            <label style={{ marginRight: '10px' }}>Jumlah Pinjaman</label>
          </div>
          <div style={{ width: '30%' }}>
            <input
              type="number"
              value={values.totalPinjaman}
              onChange={this.handleFieldChange('jumlahPinjaman')}
            />
          </div>
        </div>
        <div className="field">
          <div style={{ width: '30%' }}>
            <label style={{ marginRight: '10px' }}>Lama Pembayaran</label>
          </div>
          <div style={{ width: '30%' }}>
            <input
              type="number"
              value={values.totalPinjaman}
              onChange={this.handleFieldChange('lamaPembayaran')}
            />
          </div>
        </div>
        <div className="field">
          <div style={{ width: '30%' }}>
            <label style={{ marginRight: '10px' }}>Bunga Pinjaman</label>
          </div>
          <div style={{ width: '30%' }}>
            <input
              type="number"
              value={values.totalPinjaman}
              onChange={this.handleFieldChange('bungaPinjaman')}
            />
          </div>
        </div>
        <div className="field">
          <div style={{ width: '30%' }}>
            <label style={{ marginRight: '10px' }}>Tipe Pinjaman</label>
          </div>
          <div style={{ width: '30%' }}>
            <select onChange={this.handleTypeChange} value={this.state.type}>
              <option value="tetap">Tetap</option>
              <option value="menurun">Bunga Menurun</option>
            </select>
          </div>
        </div>
        <div className="button">
          <input type="submit" value="Hitung" onClick={this.handleCount()}/>
        </div>
        <table className={isHide ? 'Table-kredit hide': 'Table-kredit'}>
          <caption>Kalkulator Kredit Bunga Tetap</caption>
          <tbody>
            <tr>
              <th>Bulan</th>
              <th>Angsuran Pinjaman</th>
              <th>Bunga</th>
              <th>Angsuran Pokok</th>
              <th>Sisa Pinjaman</th>
            </tr>
            {this.renderColumn()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
