const mongoose = require('mongoose');

const oilSchema = new mongoose.Schema({
    end_year: {
        type: Number,
        
    },
    intensity: {
        type: Number,
        
    },
    sector: {
        type: String,
        
    },
    topic: {
        type: String,
        
    },
    insight: {
        type: String,
    
    },
   
    url: {
        type: String,
        
    },
    region: {
        type: String,
        
    },
    start_year: {
        type: Date,
        
    },
    impact: {
        type: String,
        
    },
    added: {
        type: Date,
        
    },
    published: {
        type:Date,
    
    },
   
    country: {
        type: String,
        
    },
    relevance: {
        type: Number,
    },
    pestle: {
        type: String,
    },
    source: {
        type: String,
    },
    title: {
        type: String,
    },
    likelihood: {
        type: Number,
    }
});

const Oil = mongoose.model('Oil', oilSchema);

module.exports = Oil;