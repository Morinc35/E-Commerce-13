const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [Product],
    });
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching categories.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [Product],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
    } else {
      res.status(200).json(categoryData);
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the category.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(201).json(categoryData);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create a new category.' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const [updatedRowsCount] = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (updatedRowsCount === 0) {
      res.status(404).json({ message: 'No category found with that id!' });
    } else {
      res.status(200).json({ message: 'Category updated successfully.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the category.' });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const deletedRowCount = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (deletedRowCount === 0) {
      res.status(404).json({ message: 'No category found with that id!' });
    } else {
      res.status(204).json({ message: 'Category deleted successfully.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the category.' });
  }
});

module.exports = router;
