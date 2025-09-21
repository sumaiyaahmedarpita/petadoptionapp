const express = require('express');
const router = express.Router();
const Pet = require('./models/Pet');
const PendingPet = require('./models/PendingPet');
// Removed auth middleware imports because we won't use them now
// const { authenticateToken, requireAdmin } = require('./middleware/auth');

// GET /api/pets
router.get('/', async (req, res) => {
  try {
    // Since no auth, just return all pets (you can customize if needed)
    const pets = await Pet.find().sort({ dateAdded: -1 });
    res.json(pets);
  } catch (error) {
    console.error('Error fetching pets:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/pendingPets - (no auth now)
router.get('/pendingPets', async (req, res) => {
  try {
    const pendingPets = await PendingPet.find().sort({ dateAdded: -1 });
    res.json(pendingPets);
  } catch (error) {
    console.error('Error fetching pending pets:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/pets - add pet (no auth)
router.post('/', async (req, res) => {
  try {
    const { name, breed, type, age, description, image, status } = req.body;

    const newPet = new Pet({
      name,
      breed,
      type,
      age,
      description,
      image,
      status: status || 'available',
      dateAdded: new Date(),
      adopted: false
    });

    await newPet.save();
    res.status(201).json({ message: 'Pet added successfully', pet: newPet });
  } catch (error) {
    console.error('Error adding pet:', error);
    res.status(500).json({ message: 'Failed to add pet' });
  }
});

// PUT /api/pets/:id - update pet (no auth)
router.put('/:id', async (req, res) => {
  try {
    const petId = req.params.id;
    const updates = req.body;

    const updatedPet = await Pet.findByIdAndUpdate(petId, updates, { new: true });

    if (!updatedPet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    res.json({ message: 'Pet updated successfully', pet: updatedPet });
  } catch (error) {
    console.error('Error updating pet:', error);
    res.status(500).json({ message: 'Failed to update pet' });
  }
});

// DELETE /api/pets/:id - delete pet (no auth)
router.delete('/:id', async (req, res) => {
  try {
    const petId = req.params.id;

    const deletedPet = await Pet.findByIdAndDelete(petId);

    if (!deletedPet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    res.json({ message: 'Pet deleted successfully' });
  } catch (error) {
    console.error('Error deleting pet:', error);
    res.status(500).json({ message: 'Failed to delete pet' });
  }
});

// POST /api/pendingPets/:id/approve - approve a pending pet (no auth)
router.post('/pendingPets/:id/approve', async (req, res) => {
  try {
    const pendingPetId = req.params.id;

    const pendingPet = await PendingPet.findById(pendingPetId);
    if (!pendingPet) {
      return res.status(404).json({ message: 'Pending pet not found' });
    }

    const newPet = new Pet({
      name: pendingPet.name,
      breed: pendingPet.breed,
      type: pendingPet.type,
      age: pendingPet.age,
      description: pendingPet.description,
      image: pendingPet.image,
      status: 'available',
      dateAdded: new Date(),
      adopted: false
    });

    await newPet.save();
    await pendingPet.deleteOne();

    res.json({ message: 'Pet approved and added to available pets.', pet: newPet });
  } catch (error) {
    console.error('Error approving pending pet:', error);
    res.status(500).json({ message: 'Failed to approve pending pet' });
  }
});

// DELETE /api/pendingPets/:id - delete pending pet (no auth)
router.delete('/pendingPets/:id', async (req, res) => {
  try {
    const pendingPetId = req.params.id;

    const deleted = await PendingPet.findByIdAndDelete(pendingPetId);
    if (!deleted) {
      return res.status(404).json({ message: 'Pending pet not found' });
    }

    res.json({ message: 'Pending pet deleted successfully' });
  } catch (error) {
    console.error('Error deleting pending pet:', error);
    res.status(500).json({ message: 'Failed to delete pending pet' });
  }
});

module.exports = router;
