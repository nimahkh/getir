import mongoose, {Schema} from 'mongoose';

const recordsSchema = new mongoose.Schema(
    {
        key: String,
        createdAt: Schema.Types.Date,
        counts: Object,
    },
    {
        collection: "records",
    },
);

const Records = mongoose.model('Records', recordsSchema);

export default Records;
