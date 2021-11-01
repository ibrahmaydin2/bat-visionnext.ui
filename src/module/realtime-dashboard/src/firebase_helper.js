import { getDocs, collection, getFirestore, query, onSnapshot } from 'firebase/firestore'

class FirebaseHelper {
  async getAllDocs (collectionName, where) {
    let db = getFirestore()
    let snapshot = null
    if (where) {
      const q = query(collection(db, collectionName), where)
      snapshot = await getDocs(q)
    } else {
      const collectionRef = collection(db, collectionName)
      snapshot = await getDocs(collectionRef)
    }
    let result = []

    snapshot.forEach(doc => {
      result.push(doc.data())
    })

    return result
  }

  watchCollection (collectionName, callback, where) {
    let db = getFirestore()
    let data = []
    if (where) {
      const q = query(collection(db, collectionName), where)
      onSnapshot(q, (querySnapshot) => {
        data = []
        querySnapshot.forEach((doc) => {
          data.push(doc.data())
        })
        callback(data)
      })
    } else {
      const collectionRef = collection(db, collectionName)
      onSnapshot(collectionRef, (querySnapshot) => {
        data = []
        querySnapshot.forEach((doc) => {
          data.push(doc.data())
        })
        callback(data)
      })
    }
  }
}

export let firebaseHelper = new FirebaseHelper()
