const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// GET /api/pendingPets - Get all pending pets (admin only)
router.get('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const pendingPets = await Pet.find({ status: 'pending' })
      .populate('shelter', 'name email')
      .sort({ dateAdded: -1 });
    res.json(pendingPets);
  } catch (error) {
    console.error('Error fetching pending pets:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/pendingPets - Submit a new pet for review (authenticated users)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, breed, age, description, image } = req.body;

    const newPet = new Pet({
      name,
      breed,
      age,
      description,
      image,
      status: 'pending',
      shelter: req.user._id,
      dateAdded: new Date(),
    });

    await newPet.save();
    res.status(201).json({ message: 'Pet submitted for approval.' });
  } catch (error) {
    console.error('Error submitting pet:', error);
    res.status(500).json({ error: 'Failed to submit pet' });
  }
});

// PUT /api/pendingPets/:id/approve - Approve a pending pet (admin only)
router.put('/:id/approve', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const pet = await Pet.findByIdAndUpdate(
      req.params.id,
      { status: 'available' },
      { new: true }
    );

    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    res.json({ message: 'Pet approved successfully', pet });
  } catch (error) {
    console.error('Error approving pet:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/pendingPets/:id/reject - Reject and delete a pending pet (admin only)
router.delete('/:id/reject', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);

    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    res.json({ message: 'Pet rejected and removed successfully' });
  } catch (error) {
    console.error('Error rejecting pet:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
