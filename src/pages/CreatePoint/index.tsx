import React, { useEffect, useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { FiArrowDownLeft } from "react-icons/fi";
import axios from "axios";

import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import api from "../../services/api";

import "./styles.css";
import logo from "../../assets/logo.svg";

import { LeafletMouseEvent } from "leaflet";

const CreatePoint = () => {
  //in array of object, declares the data type os array items

  /**
   * Interfaces declarations
  /**
   * @interface Item
   */
  interface Item {
    id: number;
    title: string;
    image_url: string;
  }
  /**
   *
   * @interface IBGEUFResponse
   */
  interface IBGEUFResponse {
    sigla: string;
  }

  interface IBGECityResponse {
    nome: string;
  }
  /**
   *
   * States declarations
   */
  const [itemList, setItemList] = useState<Item[]>([]);
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedUf, setSelectedUf] = useState("0");
  const [selectedCity, setSelectedCity] = useState("0");
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      const { latitude, longitude } = position.coords;
      setInitialPosition([latitude, longitude]);
    });
  }, []);

  //'created', executes when component is redered
  useEffect(() => {
    api.get("item").then((response) => {
      setItemList(response.data.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get<IBGEUFResponse[]>(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      )
      .then((response) => {
        const UFinitials = response.data.map((uf) => uf.sigla);
        setUfs(UFinitials);
      });
  }, []);

  useEffect(() => {
    if (selectedUf === "0") {
      return;
    }
    axios
      .get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
      )
      .then((response) => {
        const cityNames = response.data.map((city) => city.nome);
        setCities(cityNames);
      });
  }, [selectedUf]);

  function handleSelectedUf(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value;
    setSelectedUf(uf);
  }
  function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value;
    setSelectedCity(city);
  }

  function handleMacClick(event: LeafletMouseEvent) {
    setSelectedPosition([event.latlng.lat, event.latlng.lng]);
  }

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

          <Map center={initialPosition} zoom={15} onclick={handleMacClick}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={selectedPosition} />
          </Map>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>
              <select
                name="uf"
                id="uf"
                value={selectedUf}
                onChange={handleSelectedUf}
              >
                <option value="0">Selecione Uma UF</option>
                {ufs.map((uf) => (
                  <option key={uf} value={uf}>
                    {uf}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select
                name="city"
                id="city"
                value={selectedCity}
                onChange={handleSelectedCity}
              >
                <option value="0">Selecione Uma Cidade</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
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
            {itemList.map((item) => (
              <li key={item.id}>
                <img src={item.image_url} alt="Test" />
                <span> {item.title}</span>
              </li>
            ))}
          </ul>
        </fieldset>

        <button type="submit"> Cadastrar Ponto de Coleta</button>
      </form>
    </div>
  );
};

export default CreatePoint;
