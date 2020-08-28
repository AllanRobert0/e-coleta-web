import React from "react";
import { Link } from "react-router-dom";
import { FiArrowDownLeft } from "react-icons/fi";
import "./styles.css";
import logo from "../../assets/logo.svg";

const CreatePoint = () => {
  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Ecoleta" />
        <Link to="/">
          <FiArrowDownLeft />
          Voltar Para Home
        </Link>
      </header>

      <form>
        <h1>Cadastro do Ponto de Coleta</h1>
        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>
          <div className="field">
            <label htmlFor="name"> Nome da Entidade</label>
            <input type="text" name="name" id="name"></input>
          </div>
          <div className="field-group">
            <div className="field">
              <label htmlFor="name"> E-mail</label>
              <input type="email" name="email" id="email"></input>
            </div>

            <div className="field">
              <label htmlFor="name"> Whatsapp</label>
              <input type="text" name="whatsapp" id="whatsapp"></input>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o Endereço no Mapa</span>
          </legend>
          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>
              <select name="uf" id="uf">
                <option value="0">Selecione Uma UF</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select name="city" id="city">
                <option value="0">Selecione Uma Cidade</option>
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Ítens de Coleta</h2>
            <span>Selecione Um ou Mais Ítens Abaixo</span>
          </legend>

          <ul className="items-grid">
            <li className="selected">
              <img src="http://localhost:3333/uploads/oleo.svg" alt="Test" />
              <span> Óleo de Cozinha</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/oleo.svg" alt="Test" />
              <span> Óleo de Cozinha</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/oleo.svg" alt="Test" />
              <span> Óleo de Cozinha</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/oleo.svg" alt="Test" />
              <span> Óleo de Cozinha</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/oleo.svg" alt="Test" />
              <span> Óleo de Cozinha</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/oleo.svg" alt="Test" />
              <span> Óleo de Cozinha</span>
            </li>
          </ul>
        </fieldset>

        <button type="submit"> Cadastrar Ponto de Coleta</button>
      </form>
    </div>
  );
};

export default CreatePoint;
