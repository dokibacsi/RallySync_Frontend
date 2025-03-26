import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthContext } from './AuthContext';
import { myAxios } from '../api/axios';

export const APIContext = createContext(null);

export const APIProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [sajatVersenyLista, setSVL] = useState([]);
    const [helyszinLista, setHL] = useState([]);
    const [categoryLista, setKL] = useState([]);
    const [versenyekLista, setVL] = useState([]);
    const [nevezesiLista, setNevezesek] = useState([]);
    const [selectedCompetition, setSelectedCompetition] = useState({})

    const getMyCompetitions = async (id) => {
        try {
            const response = await myAxios.get(`/api/myCompetitions/${id}`);
            setSVL(response.data)
            return response.data
        } catch (error) {
            console.error("Hiba:", error);
        }
    };

    const getHelyszin = async () => {
        try {
            const response = await myAxios.get("/api/places");
            //console.log("Helyszínek: ", response.data)
            setHL(response.data)
        } catch (error) {
            console.error("Hiba:", error);
        }
    };

    const getCompetitions = async () => {
        try {
            const response = await myAxios.get("/api/competitions");
            //console.log("Helyszínek: ", response.data)
            setVL(response.data)
        } catch (error) {
            console.error("Hiba:", error);
        }
    };

    const postCompetition = async (data) => {
        try {
            const response = await myAxios.post("api/competition", data); // POST kérést küldünk
            console.log("Sikeres feltöltés!");
        } catch (error) {
            console.error("Hiba:", error);
        }
    };

    const getKategoriak = async () => {
        try {
            const response = await myAxios.get("api/categories");
            //console.log(response.data)
            setKL(response.data)
        } catch (error) {
            console.error("Hiba:", error);
        }
    };

    const getEntryList = async (id) => {
        try {
            //console.log(id)
            const response = await myAxios.get(`api/entry-list/${id}`);
            setNevezesek(response.data)
        } catch (error) {
            console.error("Hiba:", error);
        }
    };

    const destroyCompCateg = async (id) => {
        try {
            const response = await myAxios.delete(`api/cocaDestroy/${id}`);
            //console.log(response.data);
        } catch (error) {
            console.error("Hiba:", error);
        }
    };

    const destroyCompetition = async (id) => {
        try {
            await myAxios.delete(`api/delete-competition/${id}`);
        } catch (error) {
            console.error("Hiba:", error);
        }
    };

    const getSelectedCompetition = async (id) => {
        try {
            const response = await myAxios.get(`api/my-selected-competition/${id}`);
            console.log(response.data)
            setSelectedCompetition(response.data[0])
            console.log(selectedCompetition);
        } catch (error) {
            console.error("Hiba:", error);
        }
    };

    const getMyCompletedCompetitions = async (id) => {
        try {
            const response = await myAxios.get(`api/my-completed-competition/${id}`);
            setSVL(response.data)
            console.log(selectedCompetition);
        } catch (error) {
            console.error("Hiba:", error);
        }
    };

    const getMyCurrentlyCompetitions = async (id) => {
        try {
            const response = await myAxios.get(`api/my-currently-competition/${id}`);
            setSVL(response.data)
            console.log(selectedCompetition);
        } catch (error) {
            console.error("Hiba:", error);
        }
    };

    const getMyUpcomingCompetitions = async (id) => {
        try {
            const response = await myAxios.get(`api/my-upcoming-competition/${id}`);
            setSVL(response.data)
            console.log(selectedCompetition);
        } catch (error) {
            console.error("Hiba:", error);
        }
    };

    const getMyCompetitionsOnSelectedDates = async (id, start, end) => {
        try {
            const response = await myAxios.get(`api/my-competition-on-selected-date/${id}/${start}/${end}`);
            setSVL(response.data)
            console.log(selectedCompetition);
        } catch (error) {
            console.error("Hiba:", error);
        }
    };

    const getMyCompetitionsOnSelectedPlace = async (id, place) => {
        try {
            const response = await myAxios.get(`api/my-competition-on-selected-place/${id}/${place}`);
            setSVL(response.data)
            console.log(selectedCompetition);
        } catch (error) {
            console.error("Hiba:", error);
        }
    };

    const updateCompetition = async (data, id) => {
        try {
            await myAxios.put(`api/update-competition/${id}`, data);
        } catch (error) {
            console.error("Hiba:", error);
        }
    };

    return (<APIContext.Provider value={{ sajatVersenyLista, helyszinLista, categoryLista, versenyekLista, postCompetition, getMyCompetitions, getKategoriak, getHelyszin, destroyCompCateg, destroyCompetition, sajatVersenyLista, getEntryList, nevezesiLista, selectedCompetition, getSelectedCompetition, setSelectedCompetition, updateCompetition, setSVL, getMyCompletedCompetitions, getMyCurrentlyCompetitions, getMyUpcomingCompetitions, getMyCompetitionsOnSelectedDates, getMyCompetitionsOnSelectedPlace }}>{children}</APIContext.Provider>)
}
export default APIContext