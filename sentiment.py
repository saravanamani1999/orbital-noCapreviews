from pymongo import MongoClient
from pprint import pprint

### LOCAL ##############
# Connecting to mongodb
client = MongoClient('mongodb://localhost:27017/')
# Selecting database
db = client.noCap
# Selecting modules collection
modules = db.modules
#########################


# To do : Run through all modules and update the ratings accordingly
modules.update_one({'code': 'AA1201'}, {'$set': {'ratings': {'difficulty': 1,
                                                             'overallExp': 5,
                                                             'teachingStaff': 4,
                                                             'workload': 4}
                                                 }})

pprint(modules.find_one())
