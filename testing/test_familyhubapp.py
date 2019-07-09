import os, unittest, sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from app import app, slugify
from familyhubapp.helpers import Helpers
from pymongo import MongoClient
from bson.objectid import ObjectId
from datetime import datetime

# config
app.config['DEBUG'] = False
app.config['SECRET_KEY'] = 'SECRET_KEY_SK'
app.config["WTF_CSRF_ENABLED"] = False
app.config['TESTING'] = True

# configure mongo
client = MongoClient('localhost', 27017)

# database / collections
db = client.familyHub
activities = db.activities
users = db.users


def testSlugify():
    capitals = slugify('CAPITALS')
    MyStrinG = slugify('MyStrinG')
    spaces = slugify('string with spaces in')
    assert capitals == 'capitals', 'slugify() should return string with all capitals changed to lowercase'
    assert MyStrinG == 'mystring', 'slugify() should return string with mix of capitals and lowercase changed to all lowercase'
    assert spaces == 'string-with-spaces-in', 'slugify() should return string where any spaces have been replaced with -'

testSlugify()




print("All tests passed")

# Run tests
if __name__ == '__main__':
    unittest.main()