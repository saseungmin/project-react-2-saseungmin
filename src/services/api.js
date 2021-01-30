import { db, auth, fireStore } from './firebase';

import { applyDateToString, createDateToString } from '../util/utils';

const branchGetGroups = (tag) => {
  if (tag) {
    return db
      .collection('groups')
      .where('tags', 'array-contains', tag)
      .orderBy('applyEndDate', 'asc')
      .get();
  }

  return db
    .collection('groups')
    .orderBy('applyEndDate', 'asc')
    .get();
};

export const getStudyGroups = async (tag) => {
  const response = await branchGetGroups(tag);

  const groups = response.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
    applyEndDate: applyDateToString(doc),
    createDate: createDateToString(doc),
  }));

  return groups;
};

export const getStudyGroup = async (id) => {
  const response = await db
    .collection('groups')
    .doc(id)
    .get();

  if (!response.exists) {
    return null;
  }

  return {
    ...response.data(),
    id: response.id,
    applyEndDate: applyDateToString(response),
    createDate: createDateToString(response),
  };
};

export const postStudyGroup = async (group) => {
  const { applyEndDate } = group;

  const timeStamp = fireStore.Timestamp.fromDate(new Date(applyEndDate));
  const now = fireStore.FieldValue.serverTimestamp();

  const { id } = await db.collection('groups').add({
    ...group,
    applyEndDate: timeStamp,
    createDate: now,
  });

  return id;
};

export const editPostStudyGroup = async ({
  title, applyEndDate, contents, tags, personnel, id,
}) => {
  const group = db.collection('groups').doc(id);

  const timeStamp = fireStore.Timestamp.fromDate(new Date(applyEndDate));

  await group.update({
    title,
    contents,
    applyEndDate: timeStamp,
    personnel,
    tags,
  });
};

export const postUpdateStudyReview = async ({ id, review }) => {
  const group = db.collection('groups').doc(id);

  await group.set({
    reviews: fireStore.FieldValue.arrayUnion(review),
  }, { merge: true });
};

export const updatePostParticipant = async ({ id, user }) => {
  const group = db.collection('groups').doc(id);

  await group.update({
    participants: fireStore.FieldValue.arrayUnion(user),
  });
};

export const deletePostParticipant = async ({ id, participants }) => {
  const group = db.collection('groups').doc(id);

  await group.update({
    participants,
  });
};

export const deletePostGroup = async (id) => {
  const group = db.collection('groups').doc(id);

  await group.delete();
};

export const updateConfirmPostParticipant = async ({ id, participants }) => {
  const group = db.collection('groups').doc(id);

  await group.update({
    participants,
  });
};

export const postUserRegister = async ({ userEmail, password }) => {
  const response = await auth
    .createUserWithEmailAndPassword(userEmail, password);

  return response;
};

export const postUserLogin = async ({ userEmail, password }) => {
  const response = await auth
    .signInWithEmailAndPassword(userEmail, password);

  return response;
};

export const postUserLogout = async () => {
  await auth.signOut();
};
