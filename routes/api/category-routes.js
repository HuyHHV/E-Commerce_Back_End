const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {
  try{
     // find all categories
    const categoriesData = await Category.findAll(
      {include: [
       // be sure to include its associated Products
        { model: Product, require:true },
      ]}
    );
    res.status(200).json(categoriesData);
  } catch(err){ res.status(500).json(err)}
});

router.get('/:id', async(req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoriesData = await Category.findByPk(req.params.id, 
      {include: [
        // be sure to include its associated Category and Tag data
        { model: Product,require:true}
      ]});
    if (!categoriesData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async(req, res) => {
  // create a new category
  try {
    const newCategory= await Category.create(req.body);
    res.status(200).json(newCategory)
  }catch(err) {console.log(err);
    res.status(400).json(err);}
});

router.put('/:id', async(req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json(categoryData)
  }
  catch(err)  {
      console.log(err);
      res.status(400).json(err);
    };
});

router.delete('/:id',async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No catagory found with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
