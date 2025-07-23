import React from 'react'
import { ResizablePane } from '../../../Components/ResizableSplit'
import {

  Text,

} from '@fluentui/react';
import { imageContainerClass, imageOverlayClass } from '../LoginStyles';
export default function LeftSectionImage() {
  return (
      <ResizablePane>
            <div className={imageContainerClass}>
              <div className={imageOverlayClass}>
                <div style={{ 
                  textAlign: 'center', 
                  color: 'white', 
                  display: 'flex', 
                  flexDirection: 'column' 
                }}>
                  <Text 
                    variant="xxLarge" 
                    styles={{ 
                      root: { 
                        fontWeight: 700, 
                        color: 'white',
                        marginBottom: '1rem',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                      } 
                    }}
                  >
                    Bienvenido a SistMat1.0
                  </Text>
                  <Text 
                    variant="large" 
                    styles={{ 
                      root: { 
                        color: 'white',
                        marginLeft: '4px',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                      } 
                    }}
                  >
                    Accede a tu cuenta para continuar
                  </Text>
                </div>
              </div>
            </div>
          </ResizablePane>
  )
}
