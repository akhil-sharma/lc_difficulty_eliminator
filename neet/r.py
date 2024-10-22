import random

class R:
    def __init__(self):
        self.buffer = set()
        self.elements = []
    
    def insert(self, val):
        if val not in self.buffer:
            self.buffer.add(val)
            self.elements.append(val)
    
    def getRandom(self):
        if self.buffer:
            random_index = random.randint(0, len(self.elements))
            element = self.elements[random_index]
            return element

if __name__ == "__main__":
    r = R()
    