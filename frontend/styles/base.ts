import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  centered: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageTitle:{
    padding: 16,
    fontSize: 20,
    backgroundColor: '#13293d',
    width: '100%',
    marginTop: 0,
    textAlign: 'center'
  },
  dividerTitle: {
    marginBottom: 12,
    width: '100%'
  },
  viewFlexCenter: {
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
});
