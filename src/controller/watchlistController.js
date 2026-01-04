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
export { addToWatchList }