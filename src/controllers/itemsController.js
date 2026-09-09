const { v4: uuidv4 } = require('uuid');
const logger = require('../utils/logger');

// In-memory storage (replace with database in production)
let items = [
  { id: '1', name: 'Sample Item 1', description: 'This is a sample item', createdAt: new Date() },
  { id: '2', name: 'Sample Item 2', description: 'Another sample item', createdAt: new Date() }
];

// List all items
const list = (req, res, next) => {
  try {
    const { limit = 10, offset = 0 } = req.query;
    const paginatedItems = items.slice(parseInt(offset), parseInt(offset) + parseInt(limit));
    
    res.json({
      data: paginatedItems,
      total: items.length,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
    
    logger.info(`Listed items (limit: ${limit}, offset: ${offset})`);
  } catch (error) {
    next(error);
  }
};

// Create a new item
const create = (req, res, next) => {
  try {
    const { name, description } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    
    const newItem = {
      id: uuidv4(),
      name,
      description: description || '',
      createdAt: new Date()
    };
    
    items.push(newItem);
    logger.info(`Created new item: ${newItem.id}`);
    
    res.status(201).json(newItem);
  } catch (error) {
    next(error);
  }
};

// Get a specific item
const get = (req, res, next) => {
  try {
    const { id } = req.params;
    const item = items.find(i => i.id === id);
    
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    logger.info(`Retrieved item: ${id}`);
    res.json(item);
  } catch (error) {
    next(error);
  }
};

// Update an item
const update = (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    
    const item = items.find(i => i.id === id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    if (name) item.name = name;
    if (description !== undefined) item.description = description;
    item.updatedAt = new Date();
    
    logger.info(`Updated item: ${id}`);
    res.json(item);
  } catch (error) {
    next(error);
  }
};

// Delete an item
const delete_ = (req, res, next) => {
  try {
    const { id } = req.params;
    const index = items.findIndex(i => i.id === id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    const deletedItem = items.splice(index, 1);
    logger.info(`Deleted item: ${id}`);
    
    res.json({ message: 'Item deleted', item: deletedItem[0] });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  list,
  create,
  get,
  update,
  delete: delete_
};
