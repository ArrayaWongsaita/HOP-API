const routeService = require("../services/route-service");

const routeController = {};

routeController.newRoute = async (req, res, next) => {
  const customerId = parseInt(req.params.customerId);
  const data = req.body;

  // data = {locationA: {lat, lng}, locationB: {description, lat, lng}, distanceInKm: 1.8, durationInMinutes: 7, fare: 30}
  const {
    locationA: { pickupPlace, pickupLat, pickupLng },
    locationB: { desPlace, desLat, desLng },
    distance,
    estTime,
    rideFare,
  } = data;

  const routeInfo = {
    customerId,
    pickupPlace,
    pickupLat,
    pickupLng,
    desPlace,
    desLat,
    desLng,
    distance,
    estTime,
    rideFare,
  };

  try {
    const newRoute = await routeService.createNewRoute(routeInfo);
    res.status(200).json(newRoute.id);
  } catch (error) {
    next(error);
  }
};

routeController.acceptRoute = async (req, res, next) => {
  const riderId = parseInt(req.params.riderId);
  const data = req.body;
  // data = {routeId: 1}
  const routeId = parseInt(data.routeId);

  try {
    const acceptedRoute = await routeService.acceptRoute(routeId, riderId);
    res.status(200).json(acceptedRoute);
  } catch (error) {
    next(error);
  }
};

routeController.finishRoute = async (req, res, next) => {
  const routeId = parseInt(req.params.routeId);
  const data = req.body;
  // data = {routeId: 1}
  try {
    const finishedRoute = await routeService.finishRoute(routeId);
  } catch (error) {
    next(error);
  }
};

module.exports = routeController;
