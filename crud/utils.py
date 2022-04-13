import numpy as np
from datetime import datetime

def generatePictureName():   
    now = datetime.now()
    tms = int(datetime.timestamp(now))
    return np.base_repr(tms, base=36)
