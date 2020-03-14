import React from 'react';
import logo from './logo.svg';
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
    }
  }

  handleFieldChange = field => (e) => {
    const { value } = e.target;
    const newState = { ...this.state };
    newState.values[field] = value;
    this.setState(newState);
  };

  handleCount = () => () => {
    const { values } = this.state;
    const { jumlahPinjaman, lamaPembayaran, bungaPinjaman } = values;
    const bungaTemp = jumlahPinjaman * (bungaPinjaman / 100);
    console.info('bungaTemp : ', bungaTemp);
    
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

  renderColumn = () => {
    const { result } = this.state;
    const arrayOfRow = [];
    arrayOfRow.push(
      <tr>
        <td></td>
        <td>Saldo Awal</td>
        <td></td>
        <td></td>
        <td>{result.jumlahPinjaman}</td>
        <td></td>
      </tr>
    );
  
    for (let i = 1; i <= result.lamaPembayaran; i += 1) {
      arrayOfRow.push(
        <tr>
          <td>{i}</td>
          <td>
            500000
          </td>
          <td>
            500000
          </td>
          <td>
            500000
          </td>
          <td>
            500000
          </td>
        </tr>
      )
    }

    return arrayOfRow;
  }

  render () {
    const { values, table } = this.state;
    const { isHide } = table;
    return (
      <div className="App">
        <div className="field">
          <label style={{ marginRight: '10px' }}>Jumlah Pinjaman</label>
          <input
            type="number"
            value={values.totalPinjaman}
            onChange={this.handleFieldChange('jumlahPinjaman')}
          />
        </div>
        <div className="field">
          <label style={{ marginRight: '10px' }}>Lama Pembayaran</label>
          <input
            type="number"
            value={values.totalPinjaman}
            onChange={this.handleFieldChange('lamaPembayaran')}
          />
        </div>
        <div className="field">
          <label style={{ marginRight: '10px' }}>Bunga Pinjaman</label>
          <input
            type="number"
            value={values.totalPinjaman}
            onChange={this.handleFieldChange('bungaPinjaman')}
          />
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
