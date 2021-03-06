const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    include: [
      {
        model: Product,
        attributes: [
          'id', 'product_name', 'price', 'stock', 'category_id'
        ]
      }
    ]

  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributesL: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  .then(dbCategoryData => {
    if(!dbCategoryData){
      res.status(404).json({ message: "No category found with this id!"});
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  Category.create({category_name: req.body.category_name})
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err=> {
      console.log(err);
      res.status(500).json(err);
    });
  // create a new category
});

router.put('/:id', (req, res) => {
  Category.update({category_name: req.body.category_name},
    {
      where: {
        id: req.params.id
      }
    }
    )
    .then(dbCategoryData => {
      if(!dbCategoryData){
        res.status(400).json({ message: 'none with this id!'});
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);  
      res.status(500).json(err);
    });
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  Category.destroy({where: {
    id: req.params.id
  }
  })
  .then(dbCategoryData => {
  if(!dbCategoryData) {
    res.status(400).json({ message: 'none with this id'});
    return;
  }
  res.json(dbCategoryData);

  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  // delete a category by its `id` value
});
module.exports = router;
