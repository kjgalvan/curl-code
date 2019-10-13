import React from 'react';
import {
  ActivityIndicator,
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
import { Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import uuid from 'uuid';
import * as firebase from 'firebase';
import environment from '../../../environment';

console.disableYellowBox = true;


export default class Camera extends React.Component {
  state = {
    image: null,
    uploading: false,
    googleResponse: null
  };

  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
  }

  render() {
    let { image, googleResponse } = this.state;

    return (
      <ScrollView>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
          <Button
            buttonStyle={styles.loginButton}
            titleStyle={styles.loginTextButton}
            onPress={this._pickImage}
            title="Pick an image from camera roll"
          />

          <Button
            onPress={this._takePhoto}
            title="Take a photo"
            buttonStyle={styles.loginButton}
            titleStyle={styles.loginTextButton}
          />

          {image &&
            <Button
              buttonStyle={styles.loginButton}
              titleStyle={styles.loginTextButton}
              onPress={() => this.submitToGoogle()}
              title="Analyze!"
            />
          }

          {googleResponse && (
            <Text
              onPress={this._copyToClipboard}
              onLongPress={this._share}
              styles={{ marginTop: 30, marginBottom: 30, alignText: 'center' }}
            >
              {googleResponse}
            </Text>
          )}

          {this._maybeRenderImage()}
          {this._maybeRenderUploadingOverlay()}

          <StatusBar barStyle="default" />
        </View>
      </ScrollView>
    );
  }

  submitToGoogle = async () => {
    try {
      this.setState({ uploading: true });
      let { image } = this.state;
      let body = JSON.stringify({
        requests: [
          {
            features: [
              { type: "DOCUMENT_TEXT_DETECTION", maxResults: 10 },
            ],
            image: {
              source: {
                imageUri: image
              }
            }
          }
        ]
      });
      let response = await fetch(
        "https://vision.googleapis.com/v1/images:annotate?key=" +
        environment.apiKey,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "POST",
          body: body
        }
      );
      let responseJson = await response.json();

      var bestGuess = '';
      for (response of responseJson.responses) {
        bestGuess += response.fullTextAnnotation.text += " , ";
      }

      this.setState({
        googleResponse: bestGuess,
        uploading: false
      });
    } catch (error) {
      console.log(error);
    }
  };

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'rgba(0,0,0,0.4)',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    let { image } = this.state;
    if (!image) {
      return;
    }

    return (
      <View
        style={{
          width: 250,
          borderRadius: 3,
          elevation: 2,
        }}>
        <View
          style={{
            borderTopRightRadius: 3,
            borderTopLeftRadius: 3,
            shadowColor: 'rgba(0,0,0,1)',
            shadowOpacity: 0.2,
            shadowOffset: { width: 4, height: 4 },
            shadowRadius: 5,
            overflow: 'hidden',
          }}>
          <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
        </View>

        <Text
          onPress={this._copyToClipboard}
          onLongPress={this._share}
          style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
          {image}
        </Text>
      </View>
    );
  };

  _share = () => {
    Share.share({
      message: this.state.image,
      title: 'Check out this photo',
      url: this.state.image,
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert('Copied image URL to clipboard');
  };

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async pickerResult => {
    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        uploadUrl = await uploadImageAsync(pickerResult.uri);
        this.setState({ image: uploadUrl });
      }
    } catch (e) {
      console.log(e);
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({ uploading: false });
    }
  };
}

async function uploadImageAsync(uri) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const ref = firebase
    .storage()
    .ref()
    .child(uuid.v4());
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return await snapshot.ref.getDownloadURL();
}

const styles = StyleSheet.create({
  loginTextButton: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  loginButton: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(232, 147, 142, 1)',
    borderRadius: 10,
    height: 50,
    width: 200,
  }
});