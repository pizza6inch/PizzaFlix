const modelOptions = {
    toJSON: {
        virtuals: true,
        transform: (_, obj) => {
            delete obj._id;
            return obj;
        }
    },
    toObject: {
        virtuals: true,
        transform: (_, obj) => {
            delete obj._id;
            return obj;
        }
    },
    versionKey: false, // disable versioning which implements optimistic concurrency control
    timestamps: true //add createdAt and updatedAt fields in the schema
};

export default modelOptions;