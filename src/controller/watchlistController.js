import { prisma } from "../config/db.js"

const addToWatchList = async (req, res) => {
    const { movieId, status, rating, notes , userId } = req.body;

    //verify movie exists 
    const movie = await prisma.movie.findUnique({
        where: { id: movieId }
    })

    if (!movie) {
        return res.status(404).json({ error: "Movie not found" });
    }
    //to check if already added 
    const existingWatchList = await prisma.watchlistItem.findUnique({
        where: {
            userId_movieId: {
                userId: userId,
                movieId: movieId
            }
        }
    })

    if (existingWatchList) {
        return res.status(400).json({ error: "Movie already in the watch list" });
    }
    const watchlistItem = await prisma.watchlistItem.create({
        data: {
            userId,
            movieId,
            status: status || "PLANNED",
            rating,
            notes,
        },
    });
    res.status(201).json({
        status : "Success" , 
        data : {
            watchlistItem
        }
    })
}
const deleteWatchList = async (req,res) => {
    // Find watchlist item and verify ownership
  const watchlistItem = await prisma.watchlistItem.findUnique({
    where: { id: req.params.id },
  });

  if (!watchlistItem) {
    return res.status(404).json({ error: "Watchlist item not found" });
  }

  // Ensure only owner can delete
  if (watchlistItem.userId !== req.user.id) {
    return res
      .status(403)
      .json({ error: "Not allowed to update this watchlist item" });
  }

  await prisma.watchlistItem.delete({
    where: { id: req.params.id },
  });

  return res.status(200).json({
    status: "success",
    message : "removed from the watchlist"
  });
}
const updateWatchList = async (req, res) => {
    try {
        const { status, rating, notes } = req.body;

        // Find item first
        const watchlistItem = await prisma.watchlistItem.findUnique({
            where: { id: req.params.id }
        });

        if (!watchlistItem) {
            return res.status(404).json({ 
                error: "Watchlist item not found" 
            });
        }

        // Check ownership
        if (watchlistItem.userId !== req.user.id) {
            return res.status(403).json({ 
                error: "Not allowed to update this watchlist item" 
            });
        }

        // Update with data
        const updated = await prisma.watchlistItem.update({
            where: { id: req.params.id },
            data: {           // ← Required!
                status,
                rating,
                notes,
                updatedAt: new Date()  // Optional: update timestamp
            }
        });

        return res.status(200).json({
            status: "success",
            message: "Watchlist updated",
            item: updated
        });

    } catch (error) {
        console.error("Update error:", error);
        return res.status(500).json({ 
            error: "Failed to update watchlist item" 
        });
    }
};
export { addToWatchList , deleteWatchList,  updateWatchList}