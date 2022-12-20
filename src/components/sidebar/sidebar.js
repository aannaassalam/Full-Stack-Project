import React from "react";
import "./sidebar.css";
import { useEffect, useState } from "react";
import InputRange from "react-input-range";
import Select from "react-select";
import axios from "axios";
import Loader from "../loader/loader";

export default function Sidebar({ reset, setData }) {
  const [startYearState, setStartYearState] = useState({
    min: 2016,
    max: 2020,
  });
  const [endYearState, setEndYearState] = useState({ min: 2016, max: 2020 });
  const [topics, setTopics] = useState([]);
  const [sector, setSector] = useState([]);
  const [region, setRegion] = useState([]);
  const [source, setSource] = useState([]);
  const [pestle, setPestle] = useState([]);
  const [country, setCountry] = useState([]);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/filter_items")
      .then((res) => {
        setOptions(res.data);
        setStartYearState({
          min: Math.min(...res.data.start_year),
          max: Math.max(...res.data.start_year),
        });
        setEndYearState({
          min: Math.min(...res.data.end_year),
          max: Math.max(...res.data.end_year),
        });
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const apply_filter = () => {
    setLoading(true);
    const payload = {};
    if (Object.values(endYearState).length > 0)
      payload["end_year"] = [endYearState.min, endYearState.max];
    if (Object.values(startYearState).length > 0)
      payload["start_year"] = [startYearState.min, startYearState.max];
    if (topics.length > 0) payload["topic"] = topics.map((item) => item.value);
    if (sector.length > 0) payload["sector"] = sector.map((item) => item.value);
    if (region.length > 0) payload["region"] = region.map((item) => item.value);
    if (source.length > 0) payload["source"] = source.map((item) => item.value);
    if (pestle.length > 0) payload["pestle"] = pestle.map((item) => item.value);
    if (country.length > 0)
      payload["country"] = country.map((item) => item.value);
    axios
      .post("http://localhost:5000/api/filter_data", {
        ...payload,
      })
      .then((res) => {
        setData(res.data.items);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const reset_filter = () => {
    reset(setLoading);
    setStartYearState({
      min: Math.min(...options.start_year),
      max: Math.max(...options.start_year),
    });
    setEndYearState({
      min: Math.min(...options.end_year),
      max: Math.max(...options.end_year),
    });
    setTopics([]);
    setSource([]);
    setSector([]);
    setRegion([]);
    setPestle([]);
    setCountry([]);
  };

  if (loading) return <Loader />;

  return (
    <div className="sidebar">
      <h2>Filters</h2>
      <div className="filter-item">
        <p className="name">Start Year</p>
        <div className="range-input">
          <InputRange
            minValue={Math.min(...options?.start_year)}
            maxValue={Math.max(...options?.start_year)}
            value={startYearState}
            onChange={(value) => setStartYearState(value)}
          />
        </div>
      </div>
      <div className="filter-item">
        <p className="name">End Year</p>
        <div className="range-input">
          <InputRange
            minValue={Math.min(...options.end_year)}
            maxValue={Math.max(...options.end_year)}
            value={endYearState}
            onChange={(value) => setEndYearState(value)}
          />
        </div>
      </div>
      <div className="filter-item">
        <p className="name">Topic</p>
        <Select
          isMulti
          options={options.topic?.map((option) => ({
            value: option,
            label: option,
          }))}
          placeholder="Select Topics"
          menuPlacement="auto"
          value={topics}
          onChange={(e) => {
            setTopics(e);
          }}
        />
      </div>
      <div className="filter-item">
        <p className="name">Sector</p>
        <Select
          isMulti
          options={options.sector?.map((option) => ({
            value: option,
            label: option,
          }))}
          placeholder="Select Sector"
          menuPlacement="auto"
          value={sector}
          onChange={(e) => setSector(e)}
        />
      </div>
      <div className="filter-item">
        <p className="name">Region</p>
        <Select
          isMulti
          options={options.region?.map((option) => ({
            value: option,
            label: option,
          }))}
          placeholder="Select Region"
          menuPlacement="auto"
          value={region}
          onChange={(e) => setRegion(e)}
        />
      </div>
      <div className="filter-item">
        <p className="name">Source</p>
        <Select
          isMulti
          options={options.source?.map((option) => ({
            value: option,
            label: option,
          }))}
          placeholder="Select Source"
          menuPlacement="auto"
          value={source}
          onChange={(e) => setSource(e)}
        />
      </div>
      <div className="filter-item">
        <p className="name">Pestle</p>
        <Select
          isMulti
          options={options.pestle?.map((option) => ({
            value: option,
            label: option,
          }))}
          placeholder="Select Pestle"
          menuPlacement="auto"
          value={pestle}
          onChange={(e) => setPestle(e)}
        />
      </div>
      <div className="filter-item">
        <p className="name">Country</p>
        <Select
          isMulti
          options={options.country?.map((option) => ({
            value: option,
            label: option,
          }))}
          placeholder="Select Country"
          menuPlacement="auto"
          value={country}
          onChange={(e) => setCountry(e)}
        />
      </div>
      <div className="buttons">
        <button className="save" onClick={apply_filter}>
          Apply
        </button>
        <button className="reset" onClick={reset_filter}>
          Reset
        </button>
      </div>
    </div>
  );
}
