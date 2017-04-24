def diff(first, second):
  intersection = [k for k in first if k in second]
  addition = [k for k in second if k not in first]
  deletion = [k for k in first if k not in second]

  return intersection, addition, deletion
    

first = {'lorem': 1, 'amet': 5}
second = {'ipsum': 2, 'dolor': 3, 'sit': 4}
    
result = diff(first, second)

_, added, removed = result

print 'diffed dicts'
print first, second

print 'added keys:'
print added

print 'removed keys:'
print removed