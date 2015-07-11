var mod = 1000;
db.getCollection('learn_2015_07_10_18_56_65').aggregate([
    {
        $project: { 
            counter: 1,
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
        $project: {
            counter: {
                $divide: [ "$counter", mod ]
            },
            win: 1
        }
    },
    {
        $project: {
            counter: {
                $subtract: [ "$counter", { $mod: ["$counter", 1 ] } ]
            },
            win: 1
        }
    },
    { 
        $group: { 
            _id: "$counter", 
            win: { 
                $sum: "$win" 
            } 
        } 
    },
    { 
        $sort: { 
            "win": -1 
        } 
    },
    { 
        $project: { 
            _id: 0, 
            counter: "$_id", 
            winningRate: {
                $multiply: [ { $divide: [ "$win", mod ] }, 100 ]
            }
        } 
    }
]);