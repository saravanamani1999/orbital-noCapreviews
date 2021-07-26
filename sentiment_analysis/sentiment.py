from pprint import pprint
from pymongo import MongoClient
from nltk.stem.wordnet import WordNetLemmatizer
from nltk.corpus import twitter_samples, stopwords
from nltk.tag import pos_tag
from nltk.tokenize import word_tokenize
from nltk import FreqDist, classify, NaiveBayesClassifier
from pandas import *

import re
import string
import random


def remove_noise(tweet_tokens, stop_words=()):

    cleaned_tokens = []

    for token, tag in pos_tag(tweet_tokens):
        token = re.sub('http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+#]|[!*\(\),]|'
                       '(?:%[0-9a-fA-F][0-9a-fA-F]))+', '', token)
        token = re.sub("(@[A-Za-z0-9_]+)", "", token)

        if tag.startswith("NN"):
            pos = 'n'
        elif tag.startswith('VB'):
            pos = 'v'
        else:
            pos = 'a'

        lemmatizer = WordNetLemmatizer()
        token = lemmatizer.lemmatize(token, pos)

        if len(token) > 0 and token not in string.punctuation and token.lower() not in stop_words:
            cleaned_tokens.append(token.lower())
    return cleaned_tokens


def get_all_words(cleaned_tokens_list):
    for tokens in cleaned_tokens_list:
        for token in tokens:
            yield token


def get_tweets_for_model(cleaned_tokens_list):
    for tweet_tokens in cleaned_tokens_list:
        yield dict([token, True] for token in tweet_tokens)


positive_tweets = twitter_samples.strings('positive_tweets.json')
negative_tweets = twitter_samples.strings('negative_tweets.json')
text = twitter_samples.strings('tweets.20150430-223406.json')
tweet_tokens = twitter_samples.tokenized('positive_tweets.json')[0]

stop_words = stopwords.words('english')

positive_tweet_tokens = twitter_samples.tokenized('positive_tweets.json')
negative_tweet_tokens = twitter_samples.tokenized('negative_tweets.json')

positive_cleaned_tokens_list = []
negative_cleaned_tokens_list = []

for tokens in positive_tweet_tokens:
    positive_cleaned_tokens_list.append(remove_noise(tokens, stop_words))

for tokens in negative_tweet_tokens:
    negative_cleaned_tokens_list.append(remove_noise(tokens, stop_words))

all_pos_words = get_all_words(positive_cleaned_tokens_list)

freq_dist_pos = FreqDist(all_pos_words)
# print(freq_dist_pos.most_common(100))

positive_tokens_for_model = get_tweets_for_model(
    positive_cleaned_tokens_list)
negative_tokens_for_model = get_tweets_for_model(
    negative_cleaned_tokens_list)

positive_dataset = [(tweet_dict, "Positive")
                    for tweet_dict in positive_tokens_for_model]

negative_dataset = [(tweet_dict, "Negative")
                    for tweet_dict in negative_tokens_for_model]

dataset = positive_dataset + negative_dataset

random.shuffle(dataset)

train_data = dataset[:7000]
test_data = dataset[7000:]

classifier = NaiveBayesClassifier.train(train_data)

# print("Accuracy is:", classify.accuracy(classifier, test_data))

# print(classifier.show_most_informative_features(100))

negative_count_1 = 0
positive_count_1 = 0
negative_count_2 = 0
positive_count_2 = 0
negative_count_3 = 0
positive_count_3 = 0
negative_count_4 = 0
positive_count_4 = 0

data = read_csv("Module_feedback.csv")
Difficulty = data['Difficulty'].tolist()
Workload = data['Workload'].tolist()
Teaching = data['Teaching'].tolist()
Overall = data['Overall'].tolist()

i = 0
while (i < 100):
    for d in Difficulty:
        feedback = d
        custom_tokens = remove_noise(word_tokenize(feedback))
        classifier.classify(dict([token, True] for token in custom_tokens))
        if classifier.classify(dict([token, True] for token in custom_tokens)) == "Negative":
            negative_count_1 += 1
        if classifier.classify(dict([token, True] for token in custom_tokens)) == "Positive":
            positive_count_1 += 1

    for w in Workload:
        feedback = w
        custom_tokens = remove_noise(word_tokenize(feedback))
        classifier.classify(dict([token, True] for token in custom_tokens))
        if classifier.classify(dict([token, True] for token in custom_tokens)) == "Negative":
            negative_count_2 += 1
        if classifier.classify(dict([token, True] for token in custom_tokens)) == "Positive":
            positive_count_2 += 1

    for t in Teaching:
        feedback = t
        custom_tokens = remove_noise(word_tokenize(feedback))
        classifier.classify(dict([token, True] for token in custom_tokens))
        if classifier.classify(dict([token, True] for token in custom_tokens)) == "Negative":
            negative_count_3 += 1
        if classifier.classify(dict([token, True] for token in custom_tokens)) == "Positive":
            positive_count_3 += 1

    for o in Overall:
        feedback = o
        custom_tokens = remove_noise(word_tokenize(feedback))
        classifier.classify(dict([token, True] for token in custom_tokens))
        if classifier.classify(dict([token, True] for token in custom_tokens)) == "Negative":
            negative_count_4 += 1
        if classifier.classify(dict([token, True] for token in custom_tokens)) == "Positive":
            positive_count_4 += 1

    i += 1

print("Negative(Difficulty):", negative_count_1/100)
print("Positive(Difficulty):", positive_count_1/100)

print("Negative(Workload):", negative_count_2/100)
print("Positive(Workload):", positive_count_2/100)

print("Negative(Teaching):", negative_count_3/100)
print("Positive(Teaching):", positive_count_3/100)

print("Negative(Overall):", negative_count_4/100)
print("Positive(Overall):", positive_count_4/100)

# Ratio
# 0.9 - 1.0 = 5 Caps
# 0.75 - 0.9 = 4 Caps
# 0.5 - 0.75 = 3 Caps
# 0.25 - 0.5 = 2 Caps
# 0.1 - 0.25 = 1 Caps
# 0 - 0.1 = 0 Caps

difficulty_ratio = negative_count_1 / (negative_count_1 + positive_count_1)
workload_ratio = negative_count_2 / (negative_count_2 + positive_count_2)
teaching_ratio = positive_count_3 / (negative_count_3 + positive_count_3)
overall_ratio = positive_count_4 / (negative_count_4 + positive_count_4)

# DIFFICULTY
difficulty_cap = 0
if difficulty_ratio > 0.9:
    difficulty_cap = 5
elif difficulty_ratio > 0.75:
    difficulty_cap = 4
elif difficulty_ratio > 0.5:
    difficulty_cap = 3
elif difficulty_ratio > 0.25:
    difficulty_cap = 2
elif difficulty_ratio > 0.1:
    difficulty_cap = 1

# WORKLOAD
workload_cap = 0
if workload_ratio > 0.9:
    workload_cap = 5
elif workload_ratio > 0.75:
    workload_cap = 4
elif workload_ratio > 0.5:
    workload_cap = 3
elif workload_ratio > 0.25:
    workload_cap = 2
elif workload_ratio > 0.1:
    workload_cap = 1

# TEACHING
teaching_cap = 0
if teaching_ratio > 0.9:
    teaching_cap = 5
elif teaching_ratio > 0.75:
    teaching_cap = 4
elif teaching_ratio > 0.5:
    teaching_cap = 3
elif teaching_ratio > 0.25:
    teaching_cap = 2
elif teaching_ratio > 0.1:
    teaching_cap = 1


# OVERALL
overall_cap = 0
if overall_ratio > 0.9:
    overall_cap = 5
elif overall_ratio > 0.75:
    overall_cap = 4
elif overall_ratio > 0.5:
    overall_cap = 3
elif overall_ratio > 0.25:
    overall_cap = 2
elif overall_ratio > 0.1:
    overall_cap = 1


print(difficulty_ratio, workload_ratio, teaching_ratio, overall_ratio)
print(difficulty_cap, workload_cap, teaching_cap, overall_cap)

### LOCAL ##############
# Connecting to mongodb
client = MongoClient(
    'mongodb+srv://test1234:test1234@cluster0.inkot.mongodb.net/noCap?retryWrites=true&w=majority')
# Selecting database
db = client.noCap
# Selecting modules collection
modules = db.modules
#########################


# To do : Run through all modules and update the ratings accordingly
modules.update_one({'code': 'AA1201'}, {'$set': {'ratings': {'difficulty': difficulty_cap,
                                                             'overallExp': workload_cap,
                                                             'teachingStaff': teaching_cap,
                                                             'workload': overall_cap}
                                                 }})

pprint(modules.find_one())
