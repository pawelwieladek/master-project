db.getCollection('search_2015_07_09_23_03_05').aggregate([
    { 
        $project: { 
            parameters: 1, 
            win: { 
                $cond: { 
                    if: { $eq: [ "$win", true ] }, 
                    then: 1, 
                    else: 0 
                } 
            } 
        } 
    },  
    { 
        $group: { 
            _id: "$parameters", 
            win : { 
                $sum: "$win" 
            } 
        } 
    },
    {
        $sort: {
            win: -1
        }
    },
    {
        $project: {
            _id: 0,
            depth: "$_id.depth",
            monotonicity: "$_id.monotonicity",
            smoothness: "$_id.smoothness",
            availability: "$_id.availability",
            maximization: "$_id.maximization",
            win: {
                $divide: [ "$win", 20 ]
            }
        }
    }
]);