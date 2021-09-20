import fetch from 'node-fetch'

const API_URL = 'https://data.vatsim.net/v3/vatsim-data.json'

const fetchData = async () => {
  const response = await fetch(API_URL)
  const data = await response.json()

  return data
}

/**
 * This function will get all of the data available from the VATSIM API
 * which can be found at https://data.vatsim.net.
 * @returns {Object} an object with all of the data available from VATSIM.
 */

const getAllData = async () => {
  return await fetchData()
}


/**
 * This function will get all of the currently connected pilots on the VATSIM network.
 * @returns an array of pilots.
 */
const getPilots = async () => {
  return await fetchData().pilots
}


/**
 * This function will allow you to get a specific pilot by their callsign.
 * @param {String} callsign the callsign of the pilot you want to get the data for.
 * @returns an object with the pilot's flight data.
 */
const getPilotByCallsign = async (callsign) => {
  const data = await fetchData()
  const pilots = data.pilots

  return pilots.filter(pilot => pilot.callsign == callsign)[0]
}


/**
 * This function will allow you to get a specific pilot by their VATSIM CID.
 * @param {Number} cid the CID of the pilot you want to get the data for.
 * @returns an object with the pilot's flight data.
 */
const getPilotByCID = async (cid) => {
  const data = await fetchData()
  const pilots = data.pilots

  return pilots.filter(pilot => pilot.cid == cid)[0]
}


/**
 * This function will allow you to get all the pilots with a specific transponder code set.
 * @param {Number} transponder the transponder code.
 * @returns an array of pilots.
 */
const getPilotsByTransponder = async (transponder) => {
  const data = await fetchData()
  const pilots = data.pilots

  return pilots.filter(pilot => pilot.transponder == transponder)
}


/**
 * This function will allow you to get all the pilots flying with a specific aircraft.
 * @param {String} aircraft the aircraft (short name e.g. A320, B737).
 * @returns an array of pilots.
 */
const getPilotsByAircraft = async (aircraft) => {
  const data = await fetchData()
  const pilots = data.pilots

  return pilots.filter(pilot => pilot.flight_plan?.aircraft_short == aircraft)
}


/**
 * This function will allow you to get all the pilots flying at an exact altitude.
 * @param {Number} altitude the exact altitude (in feet).
 * @returns an array of pilots.
 */
const getPilotsAtAltitude = async (altitude) => {
  const data = await fetchData()
  const pilots = data.pilots

  return pilots.filter(pilot => pilot.altitude == altitude)
}


/**
 * This function will get all of the pilots flying between the two altitudes you specify.
 * @param {Number} minAltitude the minimum altitude (pilots below this altitude will be ignored).
 * @param {Number} maxAltitude the maximum altitude (pilots above this altitude will be ignored).
 * @returns an array of pilots. 
 */
const getPilotsBetweenAltitudes = async (minAltitude, maxAltitude) => {
  const data = await fetchData()
  const pilots = data.pilots

  return pilots.filter(pilot => (pilot.altitude > minAltitude) && (pilot.altitude < maxAltitude))
}


/**
 * This function will allow you to get all the pilots flying at an exact speed.
 * @param {Number} speed the exact speed (ground speed in knots).
 * @returns an array of pilots.
 */
const getPilotsAtSpeed = async (speed) => {
  const data = await fetchData()
  const pilots = data.pilots

  return pilots.filter(pilot => pilot.groundspeed == speed)
}


/**
 * This function will get all of the pilots flying between the two speeds you specify.
 * @param {Number} minSpeed the minimum speed (pilots flying slower than tis speed will be ignored).
 * @param {Number} maxSpeed the maximum speed (pilots flying faster than this speed will be ignored).
 * @returns an array of pilots.
 */
const getPilotsBetweenSpeeds = async (minSpeed, maxSpeed) => {
  const data = await fetchData()
  const pilots = data.pilots

  return pilots.filter(pilot => (pilot.groundspeed > minSpeed) && (pilot.groundspeed < maxSpeed))
}


/**
 * This function will get all of the pilots departing (or who have already departed) from the airport you specify.
 * @param {String} icao the airport's ICAO code. 
 * @returns an array of pilots.
 */
const getDeparturesFrom = async (icao) => {
  const data = await fetchData()
  const pilots = data.pilots

  return pilots.filter(pilot => pilot.flight_plan?.departure == icao)
}


/**
 * This function will get all of the pilots arriving (or who have already arrived) into the airport you specify.
 * @param {String} icao the airport's ICAO code.
 * @returns an array of pilots.
 */
const getArrivalsInto = async (icao) => {
  const data = await fetchData()
  const pilots = data.pilots

  return pilots.filter(pilot => pilot.flight_plan?.arrival == icao)
}


/**
 * This function will get all of the currently connected controllers on the VATSIM network.
 * @returns an array of controllers.
 */
const getControllers = async () => {
  return await fetchData().controllers
}


/**
 * This function will get all of the online ATIS stations on the VATSIM network. 
 * @returns an array of ATIS stations
 */
const getATIS = async () => {
  return await fetchData().atis
}


/**
 * This function will get all of the VATSIM ratings available for pilots.
 * A list of some of the ratings can be found here: https://www.vatsim.net/news/restructuring-pilot-rating-system.
 * @returns an array of ratings.
 */
const ratings = async () => {
  const data = await fetchData()

  return {
    pilot: data.pilot_ratings,
    other: data.ratings
  }
}


/**
 * This function will get all of the VATSIM facilities available. 
 * A list of some of the facilities can be found here: https://www.vatsim.net/documents/global-ratings-policy.
 * @returns an array of facilities.
 */
const controllerTypes = async () => {
  return await fetchData().facilities
}


/**
 * This function will get all of the VATSIM servers.
 * @returns an array of servers.
 */
const servers = async () => {
  return await fetchData().servers
}


export default {
  getAllData,
  getPilots,
  getPilotByCallsign,
  getPilotByCID,
  getPilotsByTransponder,
  getPilotsByAircraft,
  getPilotsAtAltitude,
  getPilotsBetweenAltitudes,
  getPilotsAtSpeed,
  getPilotsBetweenSpeeds,
  getDeparturesFrom,
  getArrivalsInto,
  getControllers,
  getATIS,
  ratings,
  controllerTypes,
  servers
}