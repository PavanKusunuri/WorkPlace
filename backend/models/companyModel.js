import mongoose, { Schema } from 'mongoose';

const schema = mongoose.schema;

const CompanySchema = new Schema({
    companyName: {
        type: String,
        required: true
    },
    websiteUrl: {
        type: String
    },
    location: {
        type: String,
        required: true
    },
    companyLevel: {
        type: String,
        required: String
    },
    createdAt: {
        type: Date,
        defaultDate: Date.now,
    }
});

const Company = mongoose.model('Company', CompanySchema)

export default Company;
