from pymongo import MongoClient
# from pymongo import Connection
from pymongo.errors import ConnectionFailure
import pandas as df
from collections import OrderedDict
import re
import json



class DataDB(object):
	"""class to connect and create MongoDB database document"""
	def __init__(self):
		self.connect_db()
		self.create_db()
		# self.insert_data()

	def connect_db(self):
		try:
			self.client = MongoClient('mongodb://localhost:27017')
		except ConnectionFailure, e:
			sys.stderr.write("Could not connect to DB: %s" % e)
			sys.exit(1)
			
	def create_db(self):
		self.db = self.client.metocean_db
		# assert db.connection == client
		return self.db

	def insert_data(self):

		datas = df.read_csv("/home/diego/metocean/metocean.txt", header=None)
		data = datas[0][:]

		data_values = []

		js = []

		for keys in range(len(datas[0][0].split('\t'))):
			val = re.findall(r'\w+', datas[0][0].split('\t')[keys])[0]
			data_values.append(val)

		try:	
			for i in range(1, len(datas[0][1:194])):
				js.append(dict(zip(data_values, datas[0][i].split('\t'))))
			

			self.db.data.insert(js)
			# return js

		except ConnectionFailure, e:
			raise e



if __name__ == '__main__':
	con = DataDB()
	result = con.insert_data()
