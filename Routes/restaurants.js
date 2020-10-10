const router = require("express").Router();
const db = require("../db");

router.get("/", async (req, res) => {
  const restaurants = await db.query("SELECT * FROM restaurants;");
  const averages = await db.query(
    "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id"
  );
  res
    .status(200)
    .json({ averages: averages.rows, restaurants: restaurants.rows });
});

router.get("/:id", async (req, res) => {
  try {
    const reviews = await db.query(
      "SELECT * FROM reviews WHERE restaurant_id = $1",
      [req.params.id]
    );
    const selectedRestaurant = await db.query(
      "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1", [req.params.id],
      [req.params.id]
    );
    res.status(201).json({
      status: "success",
      data: {
        restaurant: selectedRestaurant.rows[0],
        reviews: reviews.rows,
      },
    });
  } catch (err) {
    res.json({ msg: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newRestaurant = await db.query(
      "INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *",
      [req.body.name, req.body.location, req.body.price_range]
    );
    res.status(201).json({
      status: "success",
      data: {
        restaurant: newRestaurant.rows[0],
      },
    });
  } catch (err) {
    res.json({ msg: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const selectedRestaurant = await db.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );
    res.status(201).json({
      status: "success",
      data: {
        restaurant: selectedRestaurant.rows[0],
      },
    });
  } catch (err) {
    res.json({ msg: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const reviews = await db.query(
      "DELETE FROM reviews WHERE restaurant_id = $1",
      [req.params.id]
    );
    const selectedRestaurant = await db.query(
      "DELETE FROM restaurants WHERE id = $1",
      [req.params.id]
    );
    res.json({
      status: "success",
    });
  } catch (err) {
    res.json({ msg: err.message });
  }
});

router.post("/:id/addReview", async (req, res) => {
  try {
    const newReview = await db.query(
      "INSERT INTO reviews (name, review, rating, restaurant_id) VALUES($1, $2, $3, $4) RETURNING *",
      [req.body.name, req.body.review, req.body.rating, req.params.id]
    );
    res.status(201).json({
      status: "success",
      data: {
        review: newReview.rows[0],
      },
    });
  } catch (err) {
    res.json({ msg: err.message });
  }
});

router.delete("/deleteReview/:id", async (req, res) => {
  try {
    const toDelete = await db.query("DELETE FROM reviews WHERE id = $1", [
      req.params.id,
    ]);
    res.json({
      status: "success",
    });
  } catch (err) {
    res.json({ msg: err.message });
  }
});

module.exports = router;
