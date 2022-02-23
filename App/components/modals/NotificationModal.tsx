import { useNavigation } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { Colors, TextTheme } from '../../theme'

import Button, { ButtonType } from 'components/buttons/Button'
import { HomeStackParams } from 'types/navigators'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  childContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },
  buttonContainer: {
    marginBottom: 35,
    marginHorizontal: 20,
  },
  iconContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  iconButton: {
    padding: 20,
    paddingVertical: 28,
  },
})

interface NotificationModalProps {
  title: string
  doneTitle?: string
  onDone?: () => void
  onHome?: () => void
  visible?: boolean
  testID?: string
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  title,
  doneTitle,
  onDone,
  onHome,
  visible,
  children,
  testID,
}) => {
  const { t } = useTranslation()
  const navigation = useNavigation<StackNavigationProp<HomeStackParams>>()
  const [modalVisible, setModalVisible] = useState<boolean>(true)

  useEffect(() => {
    if (visible !== undefined) {
      setModalVisible(visible)
    }
  }, [visible])

  const close = () => {
    setModalVisible(false)
  }

  const closeHome = () => {
    close()
    navigation.navigate('Home')
  }

  return (
    <Modal testID={testID} visible={modalVisible} transparent={true}>
      <SafeAreaView style={styles.container}>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={onHome || closeHome}>
            <Icon name="home" size={24} color={Colors.text}></Icon>
          </TouchableOpacity>
        </View>
        <View style={styles.childContainer}>
          <Text style={[TextTheme.headingThree, { fontWeight: 'normal', textAlign: 'center' }]}>{title}</Text>
          {children}
        </View>
        <View style={styles.buttonContainer}>
          <Button
            buttonType={ButtonType.Primary}
            title={doneTitle || t('Global.Done')}
            onPress={onDone || close}
          ></Button>
        </View>
      </SafeAreaView>
    </Modal>
  )
}

export default NotificationModal
