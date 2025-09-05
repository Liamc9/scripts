import React, { useState, useEffect } from "react";
import { 
  collection, 
  doc, 
  query, 
  where, 
  addDoc, 
  updateDoc, 
  deleteDoc 
} from "firebase/firestore";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "../firebase-config";

// Accept userId and listingId as props for flexibility and clarity.
// If not provided, use placeholder values and clearly label them.
function DataExampleComponent({ userId = "abc123" /* placeholder userId */, listingId = "existingListingId" /* placeholder listingId */ }) {
    const [roomData, setRoomData] = useState(null);
    const [listings, setListings] = useState([]);
    const [multipleDocs, setMultipleDocs] = useState([]);
    
    // Option 1: Get QuerySnapshot for user listings
    const [listingsSnapshot, listingsLoading, listingsError] = useCollection(
        query(collection(db, "listings"), where("userId", "==", userId)),
    );

    useEffect(() => {
        setListings(listingsSnapshot?.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })));
    }, [listingsSnapshot]);

    // Option 2: Get DocumentSnapshot for a single document
    // listingId is now a prop (or uses placeholder)
    const [roomSnapshot, roomLoading, roomError] = useDocument(
        doc(db, "listings", listingId),
    );

    useEffect(() => {
        if (roomSnapshot) {
            setRoomData(roomSnapshot.data());
        }
    }, [roomSnapshot]);

    // NEW: Get Multiple Documents by Array of IDs
    const arrayOfIds = ["id1", "id2", "id3"]; // Replace with your actual array of IDs

    const [multipleDocsSnapshot, multipleDocsLoading, multipleDocsError] = useCollection(
        arrayOfIds.length > 0
            ? query(
                collection(db, "listings"),
                where("__name__", "in", arrayOfIds)
              )
            : null // If arrayOfIds is empty, don't run the query
    );

    useEffect(() => {
        if (multipleDocsSnapshot) {
            setMultipleDocs(multipleDocsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            })));
        }
    }, [multipleDocsSnapshot]);

    if (roomLoading || listingsLoading || multipleDocsLoading) return <p>Loading...</p>;
    if (roomError || listingsError || multipleDocsError) return <p>Error loading data</p>;

    // ADD DOC
    const addListing = async (data) => {
        await addDoc(collection(db, "listings"), data);
    };
    const handleAdd = () => {
        addListing({ 
            title: "New Listing", 
            description: "Awesome place!", 
            userId // use the prop or placeholder
        });
    };

    // UPDATE DOC
    const updateListing = async (id, data) => {
        await updateDoc(doc(db, "listings", id), data);
    };
    const handleUpdate = () => {
        updateListing(listingId, { title: "Updated Title" }); // use the prop or placeholder
    };

    // DELETE DOC
    const removeListing = async (id) => {
        await deleteDoc(doc(db, "listings", id));
    };
    const handleDelete = () => {
        removeListing(listingId); // use the prop or placeholder
    };

    return (
        <div>
            <h2>User Listings</h2>
            {listings?.map((listing) => (
                <div key={listing.id}>
                    <h3>{listing.title}</h3>
                    <p>{listing.description}</p>
                </div>
            ))}

            <div>
                <h1>{roomData?.displayName}</h1>
                <p>Email: {roomData?.email}</p>
            </div>

            {/* NEW: Display Multiple Documents */}
            <div>
                <h2>Multiple Listings</h2>
                {multipleDocs.map((doc) => (
                    <div key={doc.id}>
                        <h3>{doc.title}</h3>
                        <p>{doc.description}</p>
                    </div>
                ))}
            </div>

            <div>
                <button onClick={handleAdd}>Add Listing</button>
                <button onClick={handleUpdate}>Update Listing</button>
                <button onClick={handleDelete}>Delete Listing</button>
            </div>
        </div>
    );
}

export default DataExampleComponent;
